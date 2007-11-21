<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<body>
	<OBJECT id='windowsMediaObject' width="560" height="440" classid='CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95'
		codebase='http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701'
		standby='Hang in there, loading...' type='application/x-oleobject'>

		<param name='fileName' value="<%=request.getParameter("url")%>">
		<param name='animationatStart' value='true'>
		<param name='transparentatStart' value='true'>
		<param name='autoStart' value="true">
		<param name='showControls' value="true">
		<param name='loop' value="false">

		<EMBED type='application/x-mplayer2' pluginspage='http://microsoft.com/windows/mediaplayer/en/download/'
			id='mediaPlayer' displaysize='0' autosize='0' bgcolor='darkblue' showcontrols="true" showtracker='-1'
			showdisplay='0' showstatusbar='-1' videoborder3d='-1' width="560" height="440"
			src="<%=request.getParameter("url")%>" autostart="true" designtimesp='5311'
			loop="false"></EMBED>
	</OBJECT>
</body>
</html>