<%--
Copyright © 2007-2008 iNetVOD, Inc. All Rights Reserved.
iNetVOD Confidential and Proprietary.  See LEGAL.txt.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.inetvod.playerClient.rqdata.ShowSearch" %>
<%@ page import="com.inetvod.playerClient.rqdata.ShowSearchList" %>
<%@ page import="com.inetvod.common.core.EncodeUtil" %>
<jsp:useBean id="sess" class="com.inetvod.webapp.player.Session" scope="request"/>
<jsp:useBean id="searchResultsView" class="com.inetvod.webapp.player.SearchResultsView" scope="request"/>

<%
	sess.load(request, response);
	searchResultsView.load(sess);
%>

<jsp:include flush="true" page="header.jsp"/>

<script type="text/javascript" src="searchResults.js"></script>
<script type="text/javascript">
	function postRunOnLoad()
	{
		LoadSearchResultsViewData("<%=EncodeUtil.encodeJSLiteral(searchResultsView.getSearchResultsViewDataXml())%>");
		SetSearchResultsImages();
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
	else
	{
		ShowSearchList showSearchList = searchResultsView.getShowSearchList();
		if((showSearchList != null) && (showSearchList.size() > 0))
		{
		%>

			<table cellspacing="0" cellpadding="3">
				<thead>
					<tr
						><td class="listHeader">Show</td
						><td class="listSmallHeader">Date</td
						><td class="listSmallHeader">Price</td
					></tr>
				</thead>
				<tbody>
				<%
					int pos = 0;
					for(ShowSearch showSearch : showSearchList)
					{
					%>
						<tr class="listRow" onclick="StartupSearchDetail('<%=showSearch.getShowID()%>');"
							><td><span id="<%=showSearch.getShowID()%>" style="display:none;"><%=pos%></span
								><table cellpadding="0" cellspacing="0" border="0">
									<tr
										><td rowspan="2" width="48" height="48" style="padding-left:5px;"><img
											id="Search003_ShowList_<%=pos%>_Picture" src="images/no_picture_48.gif" border=0
											width=48 alt=""/></td
										><td class="listItem"><a class="listItem"
											onclick="StartupSearchDetail('<%=showSearch.getShowID()%>'); stopEventPropagation(event);"
											><%=showSearch.getName()%></a></td
									></tr>
									<tr
										><td class="listSmallWrapItem"><%=showSearch.getEpisodeName() != null
											? showSearch.getEpisodeName() : ""%></td
									></tr>
								</table
							></td
							><td class="listSmallItem"><%=showSearch.buildReleasedStr()%></td
							><td class="listSmallItem"><%=showSearch.buildCostStr()%></td
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
			<div class="textCtr" style="padding:20px">No shows were found matching your search criteria.
			Please try again.
			</div>
		<%
		}
	}
%>

<jsp:include flush="true" page="footer.jsp"/>