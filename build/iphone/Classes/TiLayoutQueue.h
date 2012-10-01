/**
 * _titanium_twitter_client_twitter_client _titanium_twitter_client_twitter_client Mobile
 * Copyright (c) 2009-2010 by _titanium_twitter_client_twitter_client, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */
#import <Foundation/Foundation.h>

@class TiViewProxy;

/**
 Layout queue utility class.
 */
@interface TiLayoutQueue : NSObject {

}

/**
 Adds view proxy to the layout queue.
 @param newViewProxy The view proxy to add.
 */
+(void)addViewProxy:(TiViewProxy*)newViewProxy;

/**
 Forces view proxy refresh.
 @param thisProxy The view proxy to layout.
 */
+(void)layoutProxy:(TiViewProxy*)thisProxy;

@end
