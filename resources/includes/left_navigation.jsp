<%@ page import="java.util.HashMap" %>
<%@ page import="com.inetvod.common.core.StrUtil" %>
<%@ page import="com.inetvod.common.data.CategoryID" %>
<%@ page import="com.inetvod.playerClient.rqdata.Category" %>
<%@ page import="com.inetvod.playerClient.rqdata.CategoryList" %>
<%@ page import="com.inetvod.playerClient.rqdata.Provider" %>
<%@ page import="com.inetvod.playerClient.rqdata.ProviderList" %>
<%@ page import="com.inetvod.playerClient.rqdata.RentedShowSearch" %>
<%@ page import="com.inetvod.playerClient.rqdata.RentedShowSearchList" %>
<%@ page import="com.inetvod.playerClient.rqdata.ShowSearch" %>
<%@ page import="com.inetvod.playerClient.rqdata.ShowSearchList" %>
<%@ page import="com.inetvod.webapp.MemRegister" %>
<%@ page import="com.inetvod.webapp.PageMenuMap" %>
<%@ page import="com.inetvod.webapp.ReadXMLFile" %>
<%@ page import="com.inetvod.webapp.player.CategorySearchView" %>
<%@ page import="com.inetvod.webapp.player.NowPlayingView" %>
<%@ page import="com.inetvod.webapp.player.ProviderSearchView" %>
<%@ page import="com.inetvod.webapp.player.SearchResultsView" %>
<table border="0" cellpadding="0" cellspacing="0" width="200">
	<%
		if("Reg".equals(request.getParameter("page")))
		{
	%>
	<tr>
		<td class="menuboxtop" align="left" valign="middle">Register</td>
	</tr>
	<%
		}
	%>
	<%
		if("Logon".equals(request.getParameter("page")))
		{
	%>
	<tr>
		<td class="menuboxtop" align="left" valign="middle">Logon</td>
	</tr>
	<%
		}
	%>
	<%
		if("other".equals(request.getParameter("page")))
		{
	%>
	<tr>
		<td class="menuboxtop" align="left" valign="middle">Account</td>
	</tr>
	<tr><td class="menubox"><p><a id="over" href="../member/cookie_exist_user.jsp">Overview</a> <br/>
		<a id="email" href="../member/mem_email.jsp">Update Email</a> <br/>
		<a id="pass" href="../member/mem_password.jsp">Update Password</a> <br/>
		<a id="pers" href="../member/mem_personal.jsp">Personal Information</a> <br/>
		<a id="card" href="../member/mem_card.jsp">Credit Card</a><br/>
		<a id="logon" href="../member/mem_logon_update.jsp">Player Logon</a> <br/>
		<a id="parent" href="../member/mem_parental.jsp">Parental Controls</a> <br/>
		<a id="cont" href="../member/mem_content.jsp">Content Formats</a><br/>
		<br>
		<font color="red"><a id="download" href="http://www.inetvod.com/download" style="color:red;"
			>DOWNLOAD</a></font></p></td></tr>
	<script type="text/javascript">
		var page = '<%= request.getParameter("link")%>';
		document.getElementById(page).style.backgroundColor = "#7CC0E2";
		document.getElementById(page).style.color = "#DAF9FC";
	</script>
	<%
		}
	%>

</table>