class_list = []

print('Welcome to the class list program.')

addClass = input('Would you like to add a class? Please enter Y or N: ')

while addClass == 'Y' or addClass == 'y':
    x = input('Please enter a class name to add to the list: ')
    class_list.append(x)
    addClass = input('Add another class? Enter Y or N: ')

    if addClass == 'N' or addClass == 'n':
        print('Thank you for using this program. Here is a list of classes you entered: ')
        for e in class_list:
            print(e)
    else: # double check if this should be elif
        addClass = input('That is not a valid input, please enter Y or N: ')
        # TO ADD: if N, still print the list
        if addClass == 'N' or addClass == 'n':
            print('Thank you for using this program. Here is a list of classes you entered: ')
            for e in class_list:
                print(e)
        elif addClass == 'Y' or addClass == 'y':
            x = input('Please enter a class name to add to the list: ')
            

else: # this may have to be moved into the while loop
    print('It appears you have not entered a class. Thank you for using this program.')


