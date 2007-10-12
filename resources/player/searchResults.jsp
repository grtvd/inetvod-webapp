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
					><td class="listCtrHeader">Show</td
					><td class="listCtrSmallHeader">Date</td
					><td class="listCtrSmallHeader">Price</td
				></tr>
			</thead>
			<tbody>
			<%
				for(ShowSearch showSearch : showSearchList)
				{
				%>
					<tr class="listCtrRow"
						><td
							><table cellpadding="0" cellspacing="0" border="0">
								<tr
									><td rowspan="2" style="padding-left:5px;"><img src="images/no_picture.gif" border=0 width=48 height=48 alt=""/></td
									><td class="listCtrItem"><a class="listCtrItem" href="nowPlaying.jsp"><%=showSearch.getName()%></a></td
								></tr>
								<tr
									><td class="listCtrSmallWrapItem"><%=showSearch.getEpisodeName() != null ? showSearch.getEpisodeName() : ""%></td
								></tr>
							</table
						></td
						><td class="listCtrSmallItem"><%=showSearch.buildReleasedStr()%></td
						><td class="listCtrSmallItem"><%=showSearch.buildCostStr()%></td
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