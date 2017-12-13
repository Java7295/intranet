<%@page import="com.company.intranet.*,java.io.*"%><%
UserRoles userRoles = new UserRoles(request);

String inSID = request.getParameter("SID");
String outPath = "community.jsp?SID="+inSID;

if (inSID == null) inSID = "";

boolean show_nav = false;
String left_navPath = "/Home/left_nav.htm";

if (show_nav) {
%>
      <div class="sideColLeft">
        <div class="sideColLeftTitle sideColLeftHd"><a href="<%=outPath%>"><img src="/Intranet/images/ByCommunity/<%=inSID%>/hdr_portlet_navigation.jpg" border="0"></a></div>
        <div>
        	<div class="lineY"></div>
        	<div id="left-nav">
          <jsp:include page="/portlets/content.jsp" flush="true">
            <jsp:param name="SID" value="<%=inSID%>" />
            <jsp:param name="path" value="<%=left_navPath %>" />
          </jsp:include>
          	</div>
            <div class="lineB"></div>
        </div>
      </div>
<%
String mainSID = "M_" + inSID;
String mainNav = "";
String subSID = "S_" + inSID;
String subNav = "";
if (request.getCookies() != null)
{
  Cookie[] cookies = request.getCookies();
  for ( int i = 0; i < cookies.length; i++)
    {
	    Cookie cookie = cookies[i];
	    if (mainSID.equals(cookie.getName())) mainNav = cookie.getValue();
	    if (subSID.equals(cookie.getName())) subNav = cookie.getValue();
    }
}
if (mainNav != null && !mainNav.equals("")) { %>
<script>
  document.getElementById('<%=mainNav%>_ul').style.display='block';
  document.getElementById('<%=mainNav%>').setAttribute("class","left-nav-toggle-active");
</script><% }
if (subNav != null && !subNav.equals("")) { %>
<script>
  document.getElementById('<%=subNav%>_ul').style.display='block';
  document.getElementById('<%=subNav%>').setAttribute("class","left-nav-toggle-active");
</script>
<% } 
} // end left_nav check
%>
	<div class="sideColLeft">
		<div class="sideColLeftTitle<% if (!show_nav) { %> sideColLeftHd<% } %>">
			<img src="/Intranet/images/Core/sideCol/myDepartment.jpg">
			<div class="leftTitleLink"><a href="/content.jsp?SID=Home&path=/links_navigations/all_communities.htm">edit</a></div>
		</div>
		<div class="lineYellow"></div>
		<div class="pad">
			<div style="clear:both;">
			<jsp:include page="/portlets/content.jsp" flush="true">
				<jsp:param name="SID" value="Home" />
				<jsp:param name="path" value="links/MyDepartment.elm" />
			</jsp:include>
			<ul class="relatedFavorites">
				<li><a href="/web/myCommunity.jsp"><%=userRoles.getPreferredCommunity()%></a></li>
			</ul>
			</div>
		</div>
		<div class="lineGreen"></div>
	</div>	
	<div class="sideColLeft">
		<div class="sideColLeftTitle">
			<img src="/Intranet/images/Core/sideCol/myTools.jpg">
			<div class="leftTitleLink"><a href="/myTools.jsp">edit</a></div>
		</div>
		<div class="lineYellow"></div>
		<div class="pad">
			<jsp:include page="/portlets/tools.jsp" flush="true">
				<jsp:param name="toolAlert" value="true" />
			</jsp:include>
		</div>
		<div class="lineGreen"></div>
	</div>
	<div class="sideColLeft">
		<div class="sideColLeftTitle">
			<img src="/Intranet/images/Core/sideCol/myFavorites.jpg">
			<div class="leftTitleLink"><a href="/myFavorites.jsp">edit</a></div>
		</div>
		<div class="lineYellow"></div>
		<div class="pad">
			<jsp:include page="/portlets/favorites.jsp" flush="true" />
		</div>
		<div class="lineGreen"></div>
	</div>
