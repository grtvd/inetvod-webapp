<%--
Copyright © 2007 iNetVOD, Inc. All Rights Reserved.
iNetVOD Confidential and Proprietary.  See LEGAL.txt.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.inetvod.playerClient.rqdata.RentedShowSearch" %>
<%@ page import="com.inetvod.playerClient.rqdata.RentedShowSearchList" %>
<jsp:useBean id="sess" class="com.inetvod.webapp.player.Session" scope="request"/>
<jsp:useBean id="nowPlayingView" class="com.inetvod.webapp.player.NowPlayingView" scope="request"/>

<%
	sess.load(request, response);
	nowPlayingView.load(sess);
%>

<jsp:include flush="true" page="header.jsp"/>

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
		If you already have an account, <a class="linkCtr">Logon</a> here.<br>
		<br>
		Otherwise, you'll need to <a class="linkCtr" href="../member/mem_new.jsp">Register</a>.
		</div>
	<%
	}
	else
	{
		RentedShowSearchList rentedShowSearchList = nowPlayingView.getRentedShowSearchList();
		if((rentedShowSearchList != null) && (rentedShowSearchList.size() > 0))
		{
		%>

			<table width="100%" cellspacing="0" cellpadding="3">
				<thead>
					<tr
						><td class="listHeader">Show</td
						><td class="listSmallHeader">Until</td
					></tr>
				</thead>
				<tbody>
				<%
					for(RentedShowSearch rentedShowSearch : rentedShowSearchList)
					{
					%>
						<tr class="listRow"
							><td
								><table cellpadding="0" cellspacing="0" border="0">
									<tr
										><td rowspan="2" style="padding-left:5px;"><img src="images/no_picture.gif"
											border=0 width=48 height=48 alt=""/></td
										><td class="listItem"><a class="listItem"
											onclick="StartupRentedShowDetail('<%=rentedShowSearch.getRentedShowID()%>%>');"
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