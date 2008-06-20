<%--
Copyright © 2007-2008 iNetVOD, Inc. All Rights Reserved.
iNetVOD Confidential and Proprietary.  See LEGAL.txt.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.inetvod.common.core.EncodeUtil" %>
<jsp:useBean id="sess" class="com.inetvod.webapp.player.Session" scope="request"/>
<jsp:useBean id="nowPlayingView" class="com.inetvod.webapp.player.NowPlayingView" scope="request"/>

<%
	sess.load(request, response);
	nowPlayingView.load(sess);
%>

<jsp:include flush="true" page="header.jsp"/>

<script type="text/javascript" src="nowPlaying.js"></script>
<script type="text/javascript">
	function postRunOnLoad()
	{
		InitNowPlaying("<%=EncodeUtil.encodeJSLiteral(nowPlayingView.getNowPlayingViewDataXml())%>");
		StartupLoadSystemData();
	}
</script>
<%
	if(sess.hasMessage())
	{
	%>
		<div class="error" style="padding:20px"><%=sess.getMessage()%></div>
	<%
	}

	if(sess.hasError())
	{
		//do nothing
	}
	else if(sess.isGuestAccess())
	{
	%>
		<div class="textCtr" style="padding:20px">Hello! 'My Shows' keeps track of shows that you pick or rent
		to be downloaded or watched later.<br>
		<br>
		It is a good idea to keep many shows in your 'My Shows' list. This will allow new shows to
		be downloaded while you are watching another show.<br>
		<br>
		If you already have an account, <a class="linkCtr" onclick="StartupLogon();">Logon</a> here.<br>
		<br>
		Otherwise, you'll need to <a class="linkCtr" onclick="document.location='../member/mem_new.jsp'; stopEventPropagation(event);"
			>Register</a>.
		</div>
	<%
	}
	else
	{
	%>

		<div id="Show002_Body" style="display:none">
			<table id="Show002_ShowList" cellspacing="0" cellpadding="3" border="0">
				<thead>
					<tr
						><td
						/><td class="listHeader"><a class="listHeader"
							onclick="NowPlayingScreen.getThe().onButton('Show002_SortByName')">Show<img
							id="Show002_ShowList_Head_Name_Img" src="../images/spacer.gif" alt=""/></a></td
						><td class="listSmallHeader"><a class="listSmallHeader"
							onclick="NowPlayingScreen.getThe().onButton('Show002_SortByReleasedOn')">Date<img
							id="Show002_ShowList_Head_ReleasedOn_Img" src="../images/spacer.gif" alt=""/></a></td
						><td class="listSmallHeader"><a class="listSmallHeader"
							onclick="NowPlayingScreen.getThe().onButton('Show002_SortByRentedOn')">Added<img
							id="Show002_ShowList_Head_RentedOn_Img" src="images/sort_asc.gif" alt=""/></a></td
						><td class="listSmallHeader"><a class="listSmallHeader"
							onclick="NowPlayingScreen.getThe().onButton('Show002_SortByAvailableUntil')">Until<img
							id="Show002_ShowList_Head_AvailableUntil_Img" src="../images/spacer.gif" alt=""/></a></td
					></tr>
				</thead>
				<tbody id="Show002_ShowList_Body"/>
			</table>
		</div>

		<div id="Show002_NoShowsText" class="textCtr" style="padding:20px;"> </div>
	<%
	}
%>

<jsp:include flush="true" page="footer.jsp"/>