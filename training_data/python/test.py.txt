# test

import os, sys, inspect
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0, parentdir) 
from bot import Bot

b = Bot()

b.addClass('tcj29', 'tc2013j@cony', '1234', test=True)

# b.addClass('tcj29','tc2013j@cony','4468', '','', test = True)  #Single Class

# b.addClass('tcj29','tc2013j@cony','9190','9191','', test = True)  #Disscusion no Lab



# b.addClass('tcj29','tc2013j@cony','16587','','16588', test = True)  #Lab no Dicussion
# b.addClass('tcj29','tc2013j@cony','16587','','16594', test = True)  #Lab no Dicussion

# b.addClass('tcj29','tc2013j@cony','5741','5743','', test = True)  #Lab no Dicussion

# b.addClass('tcj29','tc2013j@cony','6133', '6140','6180', test = True)  #Disscussion and Lab  FIRST PAGE
# b.addClass('tcj29','tc2013j@cony','6133', '6147','6190', test = True)  #Disscussion and Lab	 SECOND PAGE

# b.addClass('tcj29','tc2013j@cony','6133', '7927','6195', test = True)  #Disscussion and Lab  LAST PAGE

