<?php
	/**************************************************************************\
	* phpGroupWare - Info Log administration                                   *
	* http://www.phpgroupware.org                                              *
	* --------------------------------------------                             *
	*  This program is free software; you can redistribute it and/or modify it *
	*  under the terms of the GNU General Public License as published by the   *
	*  Free Software Foundation; either version 2 of the License, or (at your  *
	*  option) any later version.                                              *
	\**************************************************************************/

	/* $Id$ */

	$save_app = $GLOBALS['phpgw_info']['flags']['currentapp']; 
	$GLOBALS['phpgw_info']['flags']['currentapp'] = 'infolog'; 

	$GLOBALS['phpgw']->translation->add_app('infolog');

	$GLOBALS['phpgw_info']['etemplate']['hooked'] = True;
	$project_id = $_GET['project_id'];
echo "<p>hook_projects: project_id='$project_id'</p>\n";
	$infolog = CreateObject('infolog.uiinfolog');
	$infolog->index(0,'projects',$project_id,array(
		'menuaction' => 'projects.uiprojects.view',
		'project_id' => $project_id
	));
	$GLOBALS['phpgw_info']['flags']['currentapp'] = $save_app;
	unset($GLOBALS['phpgw_info']['etemplate']['hooked']); 
