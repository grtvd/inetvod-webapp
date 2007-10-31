<%--
Copyright © 2007 iNetVOD, Inc. All Rights Reserved.
iNetVOD Confidential and Proprietary.  See LEGAL.txt.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.inetvod.playerClient.rqdata.ShowSearch" %>
<%@ page import="com.inetvod.playerClient.rqdata.ShowSearchList" %>
<jsp:useBean id="sess" class="com.inetvod.webapp.player.Session" scope="request"/>
<jsp:useBean id="searchResultsView" class="com.inetvod.webapp.player.SearchResultsView" scope="request"/>

<%
	sess.load(request, response);
	searchResultsView.load(sess);
%>

<jsp:include flush="true" page="header.jsp"/>

<%
	if(sess.hasMessage())
	{
	%>
		<span class="error"><%=sess.getMessage()%></span>
	<%
	}

	ShowSearchList showSearchList = searchResultsView.getShowSearchList();
	if((showSearchList != null) && (showSearchList.size() > 0))
	{
	%>

		<table width="100%" cellspacing="0" cellpadding="3">
			<thead>
				<tr
					><td class="listHeader">Show</td
					><td class="listSmallHeader">Date</td
					><td class="listSmallHeader">Price</td
				></tr>
			</thead>
			<tbody>
			<%
				for(ShowSearch showSearch : showSearchList)
				{
				%>
					<tr class="listRow"
						><td
							><table cellpadding="0" cellspacing="0" border="0">
								<tr
									><td rowspan="2" style="padding-left:5px;"><img src="images/no_picture.gif" border=0 width=48 height=48 alt=""/></td
									><td class="listItem"><a class="listItem" href="nowPlaying.jsp"><%=showSearch.getName()%></a></td
								></tr>
								<tr
									><td class="listSmallWrapItem"><%=showSearch.getEpisodeName() != null ? showSearch.getEpisodeName() : ""%></td
								></tr>
							</table
						></td
						><td class="listSmallItem"><%=showSearch.buildReleasedStr()%></td
						><td class="listSmallItem"><%=showSearch.buildCostStr()%></td
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