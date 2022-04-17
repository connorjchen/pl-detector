open Quartic
open Base
open Js_of_ocaml

let draw_prime_graph cy parent (id_graph : Tree.id_graph) =
  let () = List.iter id_graph.nodes ~f:(fun id ->
    let rep_id = String.concat [(Int.to_string id); "-rep"] |> Js.string in
    let node = object%js 
      val group = Js.string "nodes"
      val data = object%js
        val label = Js.string ""
        val polarisation = true
        val id = rep_id
        val parent = parent
      end
    end
    in
    let added_node = cy##add (Js.Unsafe.coerce node) in
    let edge = object%js
      val data = object%js
        val source = rep_id
        val target = Int.to_string id |> Js.string
      end
    end
    in
    let added_edge = cy##add (Js.Unsafe.coerce edge) in
    let () = (Js.Unsafe.coerce added_edge)##addClass (Js.string "compoundOut") in
    (Js.Unsafe.coerce added_node)##addClass (Js.string "inCompound"))
  in
  let () = List.iter id_graph.edges ~f:(fun (id1, id2) ->
    let edge = object%js
      val data = object%js
        val source = String.concat [(Int.to_string id1); "-rep"] |> Js.string
        val target = String.concat [(Int.to_string id2); "-rep"] |> Js.string
      end
    end
    in
    let added_edge = cy##add (Js.Unsafe.coerce edge) in
    (Js.Unsafe.coerce added_edge)##addClass (Js.string "compoundIn"))
  in
  ()

let draw_before cy parent tl =
  let rep_id_list = List.map tl ~f:(fun t ->
    let id = Int.to_string t.Tree.id in
    let rep_id = String.concat [id; "-rep"] |> Js.string in
    let node = object%js 
      val group = Js.string "nodes"
      val data = object%js
        val label = Js.string ""
        val polarisation = true
        val id = rep_id
        val parent = parent
      end
    end
    in
    let added_node = cy##add (Js.Unsafe.coerce node) in
    let edge = object%js
      val data = object%js
        val source = rep_id
        val target = Js.string id
      end
    end
    in
    let added_edge = cy##add (Js.Unsafe.coerce edge) in
    let () = (Js.Unsafe.coerce added_edge)##addClass (Js.string "compoundOut") in
    let () = (Js.Unsafe.coerce added_node)##addClass (Js.string "inCompound") in
    rep_id)
  in

  let rec draw_inner il =
    match il with
    | [] -> ()
    | [_] -> ()
    | h1 :: h2 :: t ->
      let edge = object%js
        val data = object%js
          val source =  h2
          val target =  h1
        end
      end
      in
      let added_edge = cy##add (Js.Unsafe.coerce edge) in
      let () = (Js.Unsafe.coerce added_edge)##addClass (Js.string "before") in
      let () = if List.is_empty t then (cy##getElementById h2)##addClass (Js.string "before-root") in 
      draw_inner (h2 :: t)
  in
  draw_inner rep_id_list

let rec draw_tree cy (tree : Tree.tree) =
  let id = Int.to_string tree.id |> Js.string in
  let group = Js.string "nodes" in
  let label, polarisation, id_list, class_ =
    match tree.connective with
    | Atom atom -> Js.string atom.label, Js.bool atom.pol, None, "atom"
    | Tensor tl ->
      let id_list = List.map tl ~f:(draw_tree cy) in
      Js.string "⊗", Js.bool true, Some id_list, "tensor"
    | Par tl ->
      let id_list = List.map tl ~f:(draw_tree cy) in
      Js.string "⅋", Js.bool true, Some id_list, "par"
    | Before tl ->
      let id_list = List.map tl ~f:(draw_tree cy) in
      Js.string "", Js.bool true, Some id_list, "before"
    | Prime (_, tl) ->
      let id_list = List.map tl ~f:(draw_tree cy) in
      Js.string "", Js.bool true, Some id_list, "prime"
  in
  let node = object%js
    val group = group
    val data = object%js
      val id = id
      val label = label
      val polarisation = polarisation
    end
  end
  in
  let added = cy##add (Js.Unsafe.coerce node) in
  let () = (Js.Unsafe.coerce added)##addClass (Js.string class_) in
  let () = 
    match id_list with
    | None -> ()
    | Some ids ->
      match tree.connective with
      | Prime (id_graph,_) -> draw_prime_graph (Js.Unsafe.coerce cy) id id_graph 
      | Before tl -> draw_before (Js.Unsafe.coerce cy) id tl
      | _ ->
        List.iter ids ~f:(fun target_id ->
          let edge = object%js 
            val data = object%js
              val source = id
              val target = target_id
            end
          end
          in
          let _ = cy##add (Js.Unsafe.coerce edge) in ())
  in    
  (Int.to_string tree.id) |> Js.string

let draw_graph ?directed cy (graph : Graph.graph) =
  Set.iter graph.nodes ~f:(fun v ->
    match v.connective with
    | Atom atom -> 
      let node = object%js
        val group = Js.string "nodes"
        val data = object%js
          val id = Int.to_string v.id |> Js.string
          val label = Js.string atom.label
          val polarisation = Js.bool atom.pol
        end
      end
      in
      cy##add node 
    | _ -> ());
  let edge_list = Graph.edge_tuple_list ?directed:directed graph.edges in
  List.iter edge_list ~f:(fun (src, trgt) ->
    let edge = object%js
      val group = Js.string "edges"
      val data = object%js
        val source = Int.to_string src.id |> Js.string
        val target = Int.to_string trgt.id |> Js.string
      end
    end
    in
    (Js.Unsafe.coerce cy)##add edge)