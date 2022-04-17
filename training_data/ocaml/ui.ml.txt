open Utils

external addClass : Dom.domTokenList -> string -> unit = "add" [@@bs.send]
external addEventListener : Dom.element -> string -> (unit -> unit) -> unit = "addEventListener" [@@bs.send]
external appendChild : Dom.element -> Dom.element -> unit = "appendChild" [@@bs.send]
external createElement : string -> Dom.element = "createElement" [@@bs.val][@@bs.scope "document"]
external getClassList : Dom.element -> Dom.domTokenList = "classList" [@@bs.get]
external getFirstChild : Dom.element -> Dom.element Js.null = "firstChild" [@@bs.get]
external getStyles : Dom.element -> Dom.cssStyleDeclaration = "style" [@@bs.get]
external getValue : Dom.element -> string = "value" [@@bs.get]
external normalize : string -> string -> string = "normalize" [@@bs.send]
external querySelector : string -> Dom.element option = "querySelector" [@@bs.val][@@bs.scope "document"][@@bs.return nullable]
external removeChild : Dom.element -> Dom.element -> unit = "removeChild" [@@bs.send]
external setStyle : Dom.cssStyleDeclaration -> string -> string -> unit = "" [@@bs.set_index]
external setTextContent : Dom.element -> string -> unit = "textContent" [@@bs.set]
external setTitle : Dom.element -> string -> unit = "title" [@@bs.set]
external toLowerCase : string -> string = "toLowerCase" [@@bs.send]

type layout = Horz | Vert
let string_of_layout = function
  | Horz -> "horz"
  | Vert -> "vert"

type color = string
type flex = bool
type size = float
type width = float
type help = string

type component
  = BorderBox of color * width * component
  | Box of layout * flex * component list
  | HelpText of color * size * string * help
  | Space of float
  | Text of color * size * string



let rec draw : component -> Dom.element = function
  | BorderBox(color, width, c) ->
      let ele = createElement "div" in
      let sty = getStyles ele in
      setStyle sty "border-color" color;
      setStyle sty "border-style" "solid";
      setStyle sty "border-width" (Js.Float.toString width ^ "px");
      appendChild ele (draw c);
      ele
  | Box(layout, flex, cs) ->
      let ele = createElement "div" in
      if flex then
        addClass (getClassList ele) "flex";
      addClass (getClassList ele) "box";
      addClass (getClassList ele) (string_of_layout layout);
      List.iter (appendChild ele % draw) cs;
      ele
  | HelpText(color, size, text, altText) ->
      let ele = createElement "span" in
      addClass (getClassList ele) "help";
      let sty = getStyles ele in
      setStyle sty "color" color;
      setStyle sty "font-size" (Js.Float.toString size ^ "em");
      setTextContent ele text;
      setTitle ele altText;
      ele
  | Space(size) ->
      let ele = createElement "span" in
      setStyle (getStyles ele) "font-size" (Js.Float.toString size ^ "em");
      setTextContent ele "\xa0";
      ele
  | Text(color, size, text) ->
      let ele = createElement "span" in
      let sty = getStyles ele in
      setStyle sty "color" color;
      setStyle sty "font-size" (Js.Float.toString size ^ "em");
      setTextContent ele text;
      ele

let rec removeAllChildren (ele: Dom.element) : unit =
  match Js.nullToOption (getFirstChild ele) with
  | Some child -> removeChild ele child; removeAllChildren ele
  | None -> ()

let update (c: component) (ui: Dom.element) =
  let c' = draw c in
  removeAllChildren ui;
  appendChild ui c'



let error (s: string) : component = Text("#ff0000", 2.0, s)

let ui_func : (Theme.t -> string -> component) ref =
  ref (fun _ _ -> error "No ui_func set!")

let set_func (f: Theme.t -> string -> component) : unit =
  ui_func := f

let theme : Theme.t ref = ref Theme.default

let set_theme (t: Theme.t) : unit =
  theme := t

let () =
  match querySelector "#ui" with
  | Some ui ->
    begin
      match querySelector "#text" with
      | Some ele -> addEventListener ele "change" (fun () ->
          let c = try
            (!ui_func) (!theme) (normalize (toLowerCase (getValue ele)) "NFC")
          with
            | Failure(s) -> error s
            | Js.Exn.Error e ->
              let msg = match Js.Exn.message e with
              | Some message -> error message
              | None -> error "An unknown error occurred"
              in begin
                match Js.Exn.stack e with
                | Some stack -> Box(Vert, true, [msg; error stack])
                | None -> msg
              end
            | exc -> error (Printexc.to_string exc)
          in update c ui)
      | None -> failwith "No #text element!"
    end
  | None -> failwith "No #ui element!"
