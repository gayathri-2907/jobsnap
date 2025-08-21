package com.endava.jobsnap.configurations;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Aspect
@Slf4j
@Component
@RequiredArgsConstructor

public class Logger {

    private final AppConstantsConfig constants;  

    @Pointcut("execution(* com.endava.jobsnap.controller..*(..)) && !within(com.endava.jobsnap.configurations..*)")
    public void loggingPointCutForControllers() {}

    @Pointcut("execution(* com.endava.jobsnap.service.Impl..*(..)) && !within(com.endava.jobsnap.configurations..*)")
    public void loggingPointCutForServices() {}

    @AfterReturning(pointcut = "loggingPointCutForControllers()", returning = "result")
    public void logAfterReturningForControllers(JoinPoint joinPoint, Object result) {
        log.info(constants.getLogMethodReturned() + " " + joinPoint.getSignature().getName());
    }

    @AfterThrowing(pointcut = "loggingPointCutForControllers()", throwing = "exception")
    public void logAfterThrowingForControllers(JoinPoint joinPoint, Throwable exception) {
        log.info(constants.getLogMethodReturned() + " " + joinPoint.getSignature().getName(), exception.getMessage());
    }

    @Around("loggingPointCutForControllers()")
    public Object aroundLoggingForControllers(ProceedingJoinPoint joinPoint) throws Throwable {
    	log.info(constants.getLogMethodStarted() + " " + joinPoint.getSignature().getName());
        Object result = joinPoint.proceed();
        log.info(constants.getLogMethodEnded() + " " + joinPoint.getSignature().getName());
        return result;
    }
    

    @AfterReturning(pointcut = "loggingPointCutForServices()", returning = "result")
    public void logAfterReturningForServices(JoinPoint joinPoint, Object result) {
        log.info(constants.getLogMethodReturned() + " " + joinPoint.getSignature().getName());
    }

    @AfterThrowing(pointcut = "loggingPointCutForServices()", throwing = "exception")
    public void logAfterThrowingForServices(JoinPoint joinPoint, Throwable exception) {
        log.info(constants.getLogMethodReturned() + " " + joinPoint.getSignature().getName(), exception.getMessage());
    }

    @Around("loggingPointCutForServices()")
    public Object aroundLoggingForServices(ProceedingJoinPoint joinPoint) throws Throwable {
        log.info(constants.getLogMethodStarted() + " " + joinPoint.getSignature().getName());
        Object result = joinPoint.proceed();
        log.info(constants.getLogMethodEnded() + " " + joinPoint.getSignature().getName());
        return result;
    }
}

