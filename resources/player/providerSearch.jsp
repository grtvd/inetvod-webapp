<%--
Copyright � 2007 iNetVOD, Inc. All Rights Reserved.
iNetVOD Confidential and Proprietary.  See LEGAL.txt.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.inetvod.playerClient.rqdata.Provider" %>
<%@ page import="com.inetvod.playerClient.rqdata.ProviderList" %>
<%@ page import="com.inetvod.webapp.player.SearchResultsView" %>
<jsp:useBean id="sess" class="com.inetvod.webapp.player.Session" scope="request"/>
<jsp:useBean id="providerSearchView" class="com.inetvod.webapp.player.ProviderSearchView" scope="request"/>

<%
	sess.load(request, response);
	providerSearchView.load(sess);
%>


<jsp:include flush="true" page="header.jsp"/>

<%
	if(sess.hasMessage())
	{
	%>
		<div class="error" style="padding:20px"><%=sess.getMessage()%></div>
	<%
	}

	ProviderList providerList = sess.getProviderList();
	if((providerList != null) && (providerList.size() > 0))
	{
	%>

		<table cellspacing="0" cellpadding="3">
			<thead>
				<tr
					><td class="listHeader">Provider</td
				></tr>
			</thead>
			<tbody>
			<%
				for(Provider provider : providerList)
				{
				%>
					<tr class="listRow" onclick="document.location='<%=SearchResultsView.buildPath(request, provider.getProviderID(), null)%>';"
						><td class="listItem"><a class="listItem"
							onclick="document.location='<%=SearchResultsView.buildPath(request, provider.getProviderID(), null)%>';  stopEventPropagation(event);"
							><%=provider.getName()%></a></td
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