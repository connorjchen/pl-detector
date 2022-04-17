#test
import threading,time

from bot import Bot
bots = [Bot() for x in range(10)] 

netid = 'tcj29'
password = 'tc2013j@cony'

classes =      ['10803','4468', '9190', '16587', '5741', '6133','13290','12576', '11161', '11166' ]
disscussions = ['10821', ' '   , '9191', ' '     , '5743', '6140', ' '    ,'12578', '11165', ' '    ]
labs =         ['10804',  ' '  ,   ' '  , '16588',   ' '  , '6180', ' '    , ' '    ,   ' '   , '11168' ]

for x in range (0, len(classes)):
          t = threading.Thread(target=bots[x].addClass, args=(netid ,password ,classes[x], disscussions[x], labs[x]), kwargs = {'test': True, 'hidden': True}  )
          t.daemon = True
          t.start()
    #thread.start_new_thread(bots[x].addClass, args=(netid ,password ,classes[x], disscussions[x], labs[x]), kwargs = {'test': True, 'hidden': True}  )
	#bots[x].addClass(netid ,password ,classes[x], disscussions[x], labs[x],  test = True, hidden = True) 

time.sleep(60)

'''
bots[0].addClass('tcj29','tc2013j@cony','10803', '10821','10804', test = True)  #Single Class

bots[1].addClass('tcj29','tc2013j@cony','4468', '','', test = True)  #Single Class

bots[2].addClass('tcj29','tc2013j@cony','9190','9191','', test = True)  #Disscusion no Lab



bots[3].addClass('tcj29','tc2013j@cony','16587','','16588', test = True)  #Lab no Dicussion
#b.addClass('tcj29','tc2013j@cony','16587','','16594', test = True)  #Lab no Dicussion

bots[4].addClass('tcj29','tc2013j@cony','5741','5743','', test = True)  #Lab no Dicussion

bots[5].addClass('tcj29','tc2013j@cony','6133', '6140','6180', test = True)  #Disscussion and Lab  FIRST PAGE
#b.addClass('tcj29','tc2013j@cony','6133', '6147','6190', test = True)  #Disscussion and Lab	 SECOND PAGE
#
#b.addClass('tcj29','tc2013j@cony','6133', '7927','6195', test = True)  #Disscussion and Lab  LAST PAGE

'''