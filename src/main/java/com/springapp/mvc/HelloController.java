package com.springapp.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/")
public class HelloController {
	@RequestMapping(value = "hello", method = RequestMethod.GET)
	public String printWelcome() {
		return "hello";
	}
	@RequestMapping("test")
	public void printValue(TestEnum testEnum){
		System.out.println(testEnum.getValue());
	}
	@RequestMapping(value = "another", method = RequestMethod.POST)
	public void printJson(String valueOne, String valueTwo){
		System.out.println(valueOne);
		System.out.println(valueTwo);
	}
	@RequestMapping(value = "this", method = RequestMethod.POST)
	public void printJson1(HttpServletRequest request){
		System.out.println(request.getParameter("valueOne"));
		System.out.println(request.getParameter("valueTwo"));
	}
	@RequestMapping(value = "model", method = RequestMethod.POST)
	public void printJson2(MyJson myJson){
		System.out.println(myJson.getValueOne());
		System.out.println(myJson.getValueTwo());
	}
}