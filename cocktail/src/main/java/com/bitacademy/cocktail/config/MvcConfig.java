//package com.bitacademy.cocktail.config;
//
//import java.nio.file.Path;
//import java.nio.file.Paths;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
//
//@Configuration
//public class MvcConfig {
//
//	final Path fileRoot = Paths.get("./public").toAbsolutePath().normalize();
//
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//    	registry.addResourceHandler("/images/**")
//        	.addResourceLocations("classpath:/static/");
//		registry.addResourceHandler("/files/**")
//		        .addResourceLocations("file:/path/to/dynamic/directory/");
//    	
//    	
////        registry
////                .addResourceHandler("/images/**")
////                .addResourceLocations(fileRoot .toUri().toString());
//    }
//}