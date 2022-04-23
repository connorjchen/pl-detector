import pytest

from ClassCreator import *

# Class

def test_class():
   c = Class()
   c.setKey("PHIL 204")
   c.setCourseName("Introduction to the Philosophy of Science")
   c.setUnits(4)
   object = c.getClass()
   assert object['courseKey'] == "PHIL 204"
   assert object['courseName'] == "Introduction to the Philosophy of Science"
   assert object['units'] == 4
   

def test_class_completion():
   c = Class()
   print(c.isCompleted)
   assert c.isCompleted == False
   c.complete()
   assert c.isCompleted == True
   

def test_classes_different():
   c1 = Class()
   c1.setKey("ART 101")
   c1.setCourseName("Art History")
   c1.setUnits(3)
   c2 = Class()
   c2.setKey("BUS 101")
   c2.setCourseName("Business Accounting")
   c2.setUnits(5)
   assert c1.courseKey != c2.courseKey
   assert c1.courseName != c2.courseName
   assert c1.units != c2.units
   assert c1 != c2


# ClassList

def test_classlist_add_single_class():
   c = Class()
   class_list = ClassList()
   class_list.addClass(c)
   assert isinstance(class_list.classes[0], Class)
   assert len(class_list.classes) == 1
   assert isinstance(class_list, ClassList)


# ClassList

def test_classlist_add_single_class2():
   c = Class()
   class_list = ClassList()
   class_list.addClass(c)
   assert isinstance(class_list.classes[0], Class)
   assert len(class_list.classes) == 1


def test_classlist_add_three_classes():
   class_list = ClassList()
   for i in range(0, 3):
      c = Class()
      class_list.addClass(c)
      assert len(class_list.classes) == i + 1


def test_classlist_add_three_classes2():
   c1 = Class()
   class_list = ClassList()
   class_list.addClass(c1)
   assert len(class_list.classes) == 1
   c2 = Class()
   class_list.addClass(c2)
   print(type(class_list))
   assert len(class_list.classes) == 2
   c3 = Class()
   class_list.addClass(c3)
   assert len(class_list.classes) == 3


def test_classlist_completion1():
   class_lists = ClassList()
   c1 = Class()
   c2 = Class()
   c3 = Class()

   c1.complete()

   class_lists.addClass(c1)
   class_lists.addClass(c2)
   class_lists.addClass(c3)

   assert class_lists.checkCompletion() == False


def test_classlist_completion2():
   class_lists1 = ClassList()
   c1 = Class()
   c2 = Class()
   c3 = Class()

   c3.complete()

   class_lists1.addClass(c1)
   class_lists1.addClass(c2)
   class_lists1.addClass(c3)

   assert class_lists1.checkCompletion() == False


def test_classlist_completion3():

   class_lists2 = ClassList()
   c1 = Class()
   c2 = Class()
   c3 = Class()

   c1.complete()
   c2.complete()
   c3.complete()

   class_lists2.addClass(c1)
   class_lists2.addClass(c2)
   class_lists2.addClass(c3)
   print("running comp3")
   assert class_lists2.checkCompletion() == True


def test_classlist_newempty():
   asdf = ClassList()
   assert len(asdf.classes) == 0