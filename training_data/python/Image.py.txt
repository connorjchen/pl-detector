__pragma__("alias","s","$")
from Widget import Widget
import random
config=Config.Config()
class Image(Widget):
	"""docstring for Button"""
	def __init__(self, titulo=""):
		Widget.__init__(self,titulo)
		self._html="<b class='titulo'></b><figure><img></figure><span class='descripcion'></span>"
		self.target.html(self._html)
		self.__button=self.target.find(">button")
		self._html=""
		self._src=""
		self.activador=None
		self._hoverEffect=None #vibrar, 
		#obscurecer, zoomIn, zoomOut, slide, blur,grayScale, sepia, blurGrayScale, opacity, opacityColor, opacityColorRandom
		#Flash, Shine, Circle
		self.inMoving=None #function(self)
		self.rotation=None # random, random[1,3] , 20ª
		self.width=400
		self._tooltip=None #top,bottom
		self._load_css=[config.base_url+"/static/css/hint.css-master/hint.css"]
		self._hint=self._titulo
	
	
	def titulo(self,titulo):
		self.target.find(">.titulo").text(titulo)
		self._titulo=titulo

	
	def update(self):
		self.format=[self._titulo]
		self.__update__()
		self.target.trigger("click",[self])

		if self.activador!=None:
			self.target.bind("click",self.activador(self))
		self.__titulo=self.target.find(">.titulo")
		self.titulo(self._titulo)
		self.target.find(">figure").find(">img").attr("src",self._src)
		if self._hoverEffect=="vibrar":
			pass
		elif self._hoverEffect=="oscurecer":
			pass
		elif self._hoverEffect=="zoomIn":
			self.target.find(">figure").addClass("hover03")
		elif self._hoverEffect=="zoomOut":
			self.target.find(">figure").addClass("hover04")
			pass
		elif self._hoverEffect=="slide":
			self.target.find(">figure").addClass("hover05")
		elif self._hoverEffect=="rotate":
			self.target.find(">figure").addClass("hover06")
		elif self._hoverEffect=="blur":
			self.target.find(">figure").addClass("hover07")
		elif self._hoverEffect=="grayScale":
			self.target.find(">figure").addClass("hover08")
		elif self._hoverEffect=="sepia":
			self.target.find(">figure").addClass("hover09")
		elif self._hoverEffect=="blurGrayScale":
			self.target.find(">figure").addClass("hover10")
		elif self._hoverEffect=="opacity":
			self.target.find(">figure").addClass("hover11")
		elif self._hoverEffect=="opacityColor":
			self.target.find(">figure").addClass("hover12")
		elif self._hoverEffect=="opacityColorRandom":
			pass
		elif self._hoverEffect=="flash":
			self.target.find(">figure").addClass("hover13")
		elif self._hoverEffect=="shine":
			self.target.find(">figure").addClass("hover14")

		elif self._hoverEffect=="circle":
			self.target.find(">figure").addClass("hover15")

		if self.rotation!=None:
			
			if type(self.rotation)==list:

				self.target.find(">figure").find(">img").css({"transform":"rotate("+str(random.randint(self.rotation[0],self.rotation[1]))+"deg)","width":self.width})
			elif self.rotation=="random":
				self.target.find(">figure").find(">img").css({"transform":"rotate("+str(random.random()*10)+"deg)","width":self.width})
			else:
				self.target.find(">figure").find(">img").css({"transform":"rotate("+str(self.rotation)+"deg)","width":self.width})
		if self._tooltip!=None:
			self.target.addClass("hint--"+self._tooltip)
			self.target.attr("data-hint",self._hint)


		
	
	
		


		