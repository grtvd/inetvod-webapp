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
<div align="center">
<table border="0" cellpadding="0" cellspacing="0" width="760">
	<tr><td><a href="../index.jsp"><img src="../player/images/logo.gif" alt="Storm Media Player" border="0"/></a></td>
		<td align="right" valign="top">
			<table border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td id="HeaderLogon" style="display:none"><a class="linkCtr" href="../member/mem_logon.jsp">Logon</a></td>
					<td id="HeaderUser" class="textCtr"></td>
					<td class="textSmallLbl">&nbsp;|&nbsp;</td>
					<td id="HeaderRegister" style="display:none"><a class="linkCtr" href="../member/mem_new.jsp">Register</a></td>
					<td id="HeaderLogout" style="display:none"><a class="linkCtr" onclick="headerLogout()">Logout</a></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr><td height="10"><img src="../images/spacer.gif" border=0 width=1 height=1 alt=""/></td></tr>
</table>
</div>
