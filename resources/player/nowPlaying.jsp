<%--
Copyright © 2007-2008 iNetVOD, Inc. All Rights Reserved.
iNetVOD Confidential and Proprietary.  See LEGAL.txt.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.inetvod.playerClient.rqdata.RentedShowSearch" %>
<%@ page import="com.inetvod.playerClient.rqdata.RentedShowSearchList" %>
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
		LoadNowPlayingViewData("<%=EncodeUtil.encodeJSLiteral(nowPlayingView.getNowPlayingViewDataXml())%>");
		SetNowPlayingImages();
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
		RentedShowSearchList rentedShowSearchList = nowPlayingView.getRentedShowSearchList();
		if((rentedShowSearchList != null) && (rentedShowSearchList.size() > 0))
		{
		%>

			<table cellspacing="0" cellpadding="3">
				<thead>
					<tr
						><td class="listHeader">Show</td
						><td class="listSmallHeader">Until</td
					></tr>
				</thead>
				<tbody>
				<%
					int pos = 0;
					for(RentedShowSearch rentedShowSearch : rentedShowSearchList)
					{
					%>
						<tr class="listRow" onclick="StartupRentedShowDetail('<%=rentedShowSearch.getRentedShowID()%>%>');"
							><td><span id="<%=rentedShowSearch.getRentedShowID()%>" style="display:none;"><%=pos%></span
								><table cellpadding="0" cellspacing="0" border="0">
									<tr
										><td rowspan="2" width="48" height="48" style="padding-left:5px;"><img
											id="Show002_ShowList_<%=pos%>_Picture" src="images/no_picture_48.gif"
											border=0 width=48 alt=""/></td
										><td class="listItem"><a class="listItem"
											onclick="StartupRentedShowDetail('<%=rentedShowSearch.getRentedShowID()%>%>'); stopEventPropagation(event);"
											><%=rentedShowSearch.getName()%></a></td
									></tr>
									<tr
										><td class="listSmallWrapItem"><%=rentedShowSearch.getEpisodeName() != null
											? rentedShowSearch.getEpisodeName() : ""%></td
									></tr>
								</table
							></td
							><td class="listSmallItem"><%=rentedShowSearch.buildAvailableUtilStr()%></td
						></tr>
					<%
						pos++;
					}
				%>
				</tbody>
			</table>

		<%
		}
		else
		{
		%>
			<div class="textCtr" style="padding:20px">Your 'My Shows' list is empty. 'My Shows' keeps track of shows
			that you pick or rent to be downloaded or watch later.<br>
			<br>
			It is a good idea to keep many shows in your 'My Shows' list. This will allow new shows to
			be downloaded while you are watching another show.
			</div>
		<%
		}
	}
%>

<jsp:include flush="true" page="footer.jsp"/>