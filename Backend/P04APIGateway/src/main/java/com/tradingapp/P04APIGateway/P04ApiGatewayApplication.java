package com.tradingapp.P04APIGateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class P04ApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(P04ApiGatewayApplication.class, args);
	}

}
