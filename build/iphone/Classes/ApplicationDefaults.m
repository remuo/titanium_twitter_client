/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"IuEDAL0GUJuut3GlQAuVfiKBDngjYEKD"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"x4JMdwkcPLTEm9Capg9SoTr8uUMGRqip"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"cP3nQPDScBaT7u2V8VpT6LZGkg8hdZd6"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"mN1OyzWue1oIUCm6bNeEg6vRy9V4psWm"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"S6QkefVFxKVNc8CsBd45pWpYX0s3FMgJ"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"dqT7GaJdi4GU7So7CVUSTlqbGJRaD7a0"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
