<%@ page import="com.inetvod.common.data.CategoryID" %>
<%@ page import="com.inetvod.webapp.player.SearchResultsView" %>
<%
	response.sendRedirect(SearchResultsView.buildPath(request, null, CategoryID.Featured));
%>
