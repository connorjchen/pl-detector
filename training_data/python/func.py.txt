from orm.tables import Library
from orm.tables import Log
# from sqlalchemy.orm import sessionmaker
# from sqlalchemy.orm.session import Session
from orm.tables import session



def add(BookName,Yearofpublication,AuthorName,Category,Addp):
    l1=Library(BookName,Yearofpublication,AuthorName,Category,Addp)
    l1.addClass()
    lg=Log(Library_id=l1.BookID,Info='Book added',Name=Addp,OldVersion=None,NewVersion=BookName)
    lg.addClass()
    



def delete(key):
    Person=input("Name: ")
    session.query(Library).filter(Library.BookID==key).delete()
    session.commit()

    lg=Log(Info='Book Deleted',Name=Person,OldVersion=None,NewVersion=None)
    lg.addClass()
  



def update(key):

    Person=input("Name: ")

    question=int(input('''
                     Update Book Name: 1
                     Update Year: 2
                     Update Author Name: 3
                     Update category: 4
                     Update Person: 5
                     Update all : 6
                   '''))

    if question==1:

        veri=session.query(Library).filter(Library.BookID==key).one()
        temp=veri.BookName

        a=input("Update Bookname: ")
        upd=session.query(Library).get(key)
        upd.BookName=a
        session.commit()


        lg=Log(Library_id=key,Info='Book updated',Name=Person,OldVersion=temp,NewVersion=a)
        lg.addClass()
        
    
    elif question==2:

        veri=session.query(Library).filter(Library.BookID==key).one()
        temp=veri.Yearofpublication
        
        b=input("Update Year: ")
        upd=session.query(Library).get(key)
        upd.Yearofpublication=b
        session.commit()

        lg=Log(Library_id=key,Info='Book updated',Name=Person,OldVersion=temp,NewVersion=b)
        Log.addClass(lg)#böyle de çağırabiliyorum**
        temp=veri.BookName
        

    elif question==3:

        veri=session.query(Library).filter(Library.BookID==key).one()
        temp=veri.AuthorName

        c=input("Update Author Name: ")
        upd=session.query(Library).get(key)
        upd.AuthorName=c
        session.commit()

        lg=Log(Library_id=key,Info='Book updated',Name=Person,OldVersion=temp,NewVersion=c)
        lg.addClass()

    
    elif question==4:

        veri=session.query(Library).filter(Library.BookID==key).one()
        temp=veri.Category

        d=input("Update Category: ")
        upd=session.query(Library).get(key)
        upd.Category=d
        session.commit()

        lg=Log(Library_id=key,Info='Book updated',Name=Person,OldVersion=temp,NewVersion=d)
        lg.addClass()


    elif question==5:

        veri=session.query(Library).filter(Library.BookID==key).one()
        temp=veri.Addp

        e=input("Enter new data: ")
        upd=session.query(Library).get(key)
        upd.Addp=e
        session.commit()

        lg=Log(Library_id=key,Info='Book updated',Name=Person,OldVersion=temp,NewVersion=e)
        lg.addClass()


    elif question==6:
        #old
        veri=session.query(Library).filter(Library.BookID==key).one()
        temp=veri.BookName
        temp1=veri.Yearofpublication
        temp2=veri.AuthorName
        temp3=veri.Category
        temp4=veri.Addp


        q1=input("Update BookName: ")
        q2=int(input("Update Year: "))
        q3=input("Update Author Name: ")
        q4=input("Update Category: ")
        q5=input("Update person: ")


        upd=session.query(Library).get(key)
        upd.BookName=q1
        session.commit()
        upd.Yearofpublication=q2
        session.commit()
        upd.AuthorName=q3
        session.commit()
        upd.Category=q4
        session.commit()
        upd.Addp=q5
        session.commit()


        lg=Log(Library_id=key,Info='Book updated',Name=Person,OldVersion="{},{},{},{},{}".format(temp,temp1,temp2,temp3,temp4),NewVersion="{},{},{},{},{}".format(q1,q2,q3,q4,q5))
        lg.addClass()
    

    else:
        print("False expression!")


   

