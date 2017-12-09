<%@page import="com.company.intranet.*"%><%
UserRoles userRoles = new UserRoles(request);
String[] roles = userRoles.getUserRole();

String inSID = request.getParameter("SID");
if (inSID == null) inSID = ""; else inSID = "?SID=" + inSID;
String inPath = request.getParameter("path");
if (inPath == null) inPath = "";
if (inPath.length() > 0 && inPath.charAt(0) == '/') inPath = "&path=" + inPath.substring(1);
else if (inPath.length() > 0) inPath = "&path=" + inPath;

String intFlag = "Work";
if (userRoles.getInternet()) intFlag = "Home";
%><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="DCS.dcsaut" content="<%=userRoles.getFileNumber()%>">
<meta name="WT.cg_n" content="<%=roles[1]%>">
<meta name="WT.cg_s" content="<%=userRoles.getAddress()%>;<%=intFlag%>">
<link rel="canonical" href="<%=request.getRequestURL() %><%=inSID %><%=inPath %>" />
<link rel="stylesheet" type="text/css" href="css/site.css" />
<link rel="stylesheet" type="text/css" href="css/left_nav.css" />
<link rel="stylesheet" type="text/css" href="css/print.css" media="print" />
<script src="js/jquery.min.js"></script>
<script src="js/jquery.cycle.all.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="js/shadowbox/shadowbox.js"></script>
<script type="text/javascript">Shadowbox.init({overlayOpacity:0.85});</script>
<!--[if IE]>
<script src="/Intranet/js/html5.js"></script>
<![endif]-->