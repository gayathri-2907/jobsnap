package com.endava.jobsnap.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiResponse<T> {
	

	private boolean success;
    private String message;
    private T data;
    private int statusCode;
    private long timestamp;
    
    public static <T> ApiResponse<T> success(T data , String message , int statusCode ){
    	
    	return ApiResponse.<T>builder()
    			.success(true)
    			.message(message)
    			.data(data)
    			.statusCode(statusCode)
    			.timestamp(System.currentTimeMillis())
    			.build();
    }
    
    public static <T> ApiResponse<T> failure(String message , int statusCode){
    	
    	return ApiResponse.<T>builder()
    			.success(false)
    			.message(message)
    			.data(null)
    			.statusCode(statusCode)
    			.timestamp(System.currentTimeMillis())
    			.build();
    }
}