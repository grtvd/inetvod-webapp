<%--
Copyright � 2007 iNetVOD, Inc. All Rights Reserved.
iNetVOD Confidential and Proprietary.  See LEGAL.txt.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.inetvod.playerClient.rqdata.Category" %>
<%@ page import="com.inetvod.playerClient.rqdata.CategoryList" %>
<%@ page import="com.inetvod.webapp.player.SearchResultsView" %>
<jsp:useBean id="sess" class="com.inetvod.webapp.player.Session" scope="request"/>
<jsp:useBean id="categorySearchView" class="com.inetvod.webapp.player.CategorySearchView" scope="request"/>

<%
	sess.load(request, response);
	categorySearchView.load(sess);
%>

<jsp:include flush="true" page="header.jsp"/>

<%
	if(sess.hasMessage())
	{
	%>
		<div class="error" style="padding:20px"><%=sess.getMessage()%></div>
	<%
	}

	CategoryList categoryList = sess.getCategoryList();
	if((categoryList != null) && (categoryList.size() > 0))
	{
	%>

		<table cellspacing="0" cellpadding="3">
			<thead>
				<tr
					><td class="listHeader">Category</td
				></tr>
			</thead>
			<tbody>
			<%
				for(Category category : categoryList)
				{
				%>
					<tr class="listRow" onclick="document.location='<%=SearchResultsView.buildPath(request, null, category.getCategoryID())%>';"
						><td class="listItem"><a class="listItem"
							onclick="document.location='<%=SearchResultsView.buildPath(request, null, category.getCategoryID())%>'; stopEventPropagation(event);"
							><%=category.getName()%></a></td
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