/**
 * _titanium_twitter_client_twitter_client _titanium_twitter_client_twitter_client Mobile
 * Copyright (c) 2009-2010 by _titanium_twitter_client_twitter_client, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */
#ifdef USE_TI_UIBUTTON

#import "TiViewProxy.h"
#import "TiUINavBarButton.h"
#import "TiToolbarButton.h"
#import "TiToolbar.h"

@interface TiUIButtonProxy : TiViewProxy<TiToolbarButton> {
@private
	UIButtonType styleCache;
	TiUINavBarButton *button;
	id<TiToolbar> toolbar; // weak
}

@end

#endif