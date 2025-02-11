package com.tradingapp.P04APIGateway;

import java.util.Arrays;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class MyBeans {

	@Bean
	public RouteLocator customRouterLocator(RouteLocatorBuilder builder) {
		return builder.routes().route("P04AUTH", r -> r.path("/auth/**").uri("lb://P04AUTH"))
				.route("P04CRUD", r -> r.path("/crud/**").uri("lb://P04CRUD"))
				.route("TRADESPHERE", r -> r.path("/transaction/**").uri("lb://TRADESPHERE")).build();
	}

	@Bean
	public CorsWebFilter corsWebFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();

		config.setAllowCredentials(true);
		config.addAllowedOrigin("http://localhost:3004"); // Use addAllowedOrigin (no duplicates)
		config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
		config.setExposedHeaders(Arrays.asList("Authorization"));

//		source.registerCorsConfiguration("/**", config); // Apply CORS to all routes
		// Apply CORS to specific paths to avoid conflicts
		source.registerCorsConfiguration("/auth/**", config);
		source.registerCorsConfiguration("/crud/**", config);
		source.registerCorsConfiguration("/transaction/**", config);
		return new CorsWebFilter(source);
	}

}
