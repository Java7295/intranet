<%@page import="com.company.intranet.UserRoles"%><%
UserRoles userRoles = new UserRoles(request);
String inSID = request.getParameter("SID");
if (userRoles.getLifecycle().equals("WIP")) {
%><script src="js/jquery.fancybox.pack.js" type="text/javascript"></script>
<script>
var QEConfig = new Object();
QEConfig.BASE_URL = "<%=userRoles.getPortalURL()%>/js";
QEConfig.RICH_TEXT_CSS = "<%=userRoles.getPortalURL()%>/css/site.css";
QEConfig.WP_URL = "<%=userRoles.getWpURL()%>";
QEConfig.SITE_NAME = "<%=inSID%>";
QEConfig.editEnabled=<% if (userRoles.getLifecycle().equals("WIP")) { %>true<% } else { %>false<% } %>;
QEConfig.approveEnabled=<% if (userRoles.getLifecycle().equals("Review")) { %>true<% } else { %>false<% } %>;
</script>
<script src="/js/quickedit.js"></script>
<% } else { %>
<script>function quickEditForm(objID,tag,showEdit,formName,inPth,inHeight,inWidth,inDesc,inSec,iconName,recy1,recy2) {} function quickEdit(objID,tag,formName,inDesc,inSec,iconName,recy1,recy2) {}</script><% } %>