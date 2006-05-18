<table border="0" cellpadding="0" cellspacing="0" width="200">
	<%
		if("Reg".equals(request.getParameter("page")))
		{
	%>
	<tr>
		<td class="menuboxtop" align="left" valign="middle">:: Register ::</td>
	</tr>
	<%
		}
	%>
	<%
		if("Logon".equals(request.getParameter("page")))
		{
	%>
	<tr>
		<td class="menuboxtop" align="left" valign="middle">:: Logon ::</td>
	</tr>
	<%
		}
	%>
	<%
		if("other".equals(request.getParameter("page")))
		{
	%>
	<tr>
		<td class="menuboxtop" align="left" valign="middle">:: Account Information ::</td>
	</tr>
	<tr><td class="menubox"><p>:: <a id="over" href="../member/cookie_exist_user.jsp">Overview</a> <br/>
		:: <a id="email" href="../member/mem_email.jsp">Update Email</a> <br/>
		:: <a id="pass" href="../member/mem_password.jsp">Update Password</a> <br/>
		:: <a id="pers" href="../member/mem_personal.jsp">Personal Information</a> <br/>
		:: <a id="card" href="../member/mem_card.jsp">Credit Card</a><br/>
		:: <a id="logon" href="../member/mem_logon_update.jsp">Player Logon</a> <br/>
		:: <a id="parent" href="../member/mem_parental.jsp">Parental Controls</a> <br/>
		:: <a id="cont" href="../member/mem_content.jsp">Content Formats</a></p></td></tr>
	<script type="text/javascript">
		var page = '<%= request.getParameter("link")%>';
		document.getElementById(page).style.color = "#626161";
	</script>
	<%
		}
	%>

</table>