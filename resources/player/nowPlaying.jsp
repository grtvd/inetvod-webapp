<%--
Copyright � 2007 iNetVOD, Inc. All Rights Reserved.
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
		<span class="error"><%=sess.getMessage()%></span>
	<%
	}

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
%>

<jsp:include flush="true" page="footer.jsp"/>