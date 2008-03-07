<%@ page import="java.util.HashMap" %>
<%@ page import="com.inetvod.common.core.StrUtil" %>
<%@ page import="com.inetvod.webapp.MemRegister" %>
<%@ page import="com.inetvod.webapp.ReadXMLFile" %>
<div align="center">
<table border="0" cellpadding="0" cellspacing="0" width="760">
	<tr><td><a href="../index.jsp"><img src="../player/images/logo.gif" alt="Storm Media Player" border="0"/></a></td>
		<td align="right" valign="top">
			<table border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td id="HeaderLogon" class="buttonSmallCtr_normal" style="display:none"><a class="buttonSmallCtr_normal"
						onclick="document.location='../member/mem_logon.jsp';">Logon</a></td>
					<td id="HeaderUser" class="textSmallCtr"/>
					<td class="textSmallLbl">&nbsp;|&nbsp;</td>
					<td id="HeaderRegister" class="buttonSmallCtr_normal" style="display:none"><a class="buttonSmallCtr_normal"
						onclick="document.location='../member/mem_new.jsp';">Register</a></td>
					<td id="HeaderLogout" class="buttonSmallCtr_normal" style="display:none"><a class="buttonSmallCtr_normal"
						onclick="headerLogout()">Logout</a></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr><td height="10"><img src="../images/spacer.gif" border=0 width=1 height=1 alt=""/></td></tr>
</table>
</div>
