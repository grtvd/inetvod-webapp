<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<body style="overflow:hidden;">
	<OBJECT id="movieObject" CLASSID="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" WIDTH="560" HEIGHT="440"
		BGCOLOR="#000000" CODEBASE="http://www.apple.com/qtactivex/qtplugin.cab">

		<PARAM name="SRC" VALUE="<%=request.getParameter("url")%>">
		<PARAM name="scale" VALUE="ASPECT">
		<PARAM name="AUTOPLAY" VALUE="true">
		<PARAM name="CONTROLLER" VALUE="true">

		<EMBED SRC="<%=request.getParameter("url")%>"
			bgcolor="#000000" name="movieObject" SCALE="ASPECT" WIDTH="560" HEIGHT="440" AUTOPLAY="true"
			CONTROLLER="true" PLUGINSPAGE="http://www.apple.com/quicktime/download/">
		</EMBED>
	</OBJECT>
</body>
</html>