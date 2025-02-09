package com.tradingapp.P04DiscoveryServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class P04DiscoveryServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(P04DiscoveryServerApplication.class, args);
	}

}
