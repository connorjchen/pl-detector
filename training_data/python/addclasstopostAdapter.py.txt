from classes.OnlineClassroom.createPost import post


class addclasspostAdapter(post):
    def __init__(self,addclass):
        self.addclass=addclass
    def getposttext(self):
        return "next class about " +self.addclass.details+" will be held on "+ self.addclass.starttime+" to " +self.addclass.endtime
    def getpostfile(self):
        return ""
    def getauthor(self):
        return self.addclass.author
    def get_course_id(self):
        return self.addclass.course_id