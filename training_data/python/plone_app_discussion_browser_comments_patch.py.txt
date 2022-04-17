from plone.app.discussion.browser.comments import CommentForm
import logging

logger = logging.getLogger('Comment Form Patch')

def updateActions(self):
    super(CommentForm, self).updateActions()
    self.actions['cancel'].addClass("standalone")
    self.actions['cancel'].addClass("hide")
    self.actions['cancel'].addClass("button")
    self.actions['cancel'].addClass("tiny")
    self.actions['cancel'].addClass("radius")
    self.actions['comment'].addClass("context")
    self.actions['comment'].addClass("button")
    self.actions['comment'].addClass("tiny")
    self.actions['comment'].addClass("radius")

CommentForm.updateActions = updateActions
logger.info("Patching plone.app.discussion.browser.comments.CommentForm.updateActions")
