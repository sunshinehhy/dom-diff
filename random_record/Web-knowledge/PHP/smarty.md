CI框架/intro.md

http://codeigniter.org.cn/user_guide/general/welcome.html

```
<%foreach from=$allvideos key=mykey item=vc%>
	<%* <!--高端视点补量的临时办法:start-->*%>
	<%if $mykey == 0 && $vc.id != '2646' %>
		<%assign var="vc" value = $firstvideo%>
	<%/elseif $mykey == 1 && $vc.id == '2646' %>
		<%assign var="vc" value = $allvideos[0] %>
	<%/if%>
	<%* <!--高端视点补量的临时办法:end-->*%>
<%/foreach%>
```
<%elseif ($smarty.get.channel|truncate:13)=="EditorChoice-"%>

<%elseif $smarty.get.channel|strstr:"EditorChoice-"%>

<%assign var="itemTags" value="?"|explode:$customLink%>
!in_array($itemId, explode(',',$itemIdsArray))

$smarty.server.REQUEST_URI|strstr:"EditorChoice-"