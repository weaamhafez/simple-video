package com.video.controller;


import com.video.model.um.user.User;

import org.springframework.security.core.annotation.AuthenticationPrincipal ;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@Controller
public class AuthController {

    private final static String DEFAULT = "index";

    @RequestMapping("login")
    public String login(@RequestParam(required = false) Boolean error, ModelMap model) throws IOException {
        model.addAttribute("error", error);
        return "login";
    }

    @RequestMapping({"index.html", "index", ""})
    public String index(@AuthenticationPrincipal User user) throws IOException {

        if (user != null) {
            return "redirect:/home";
        }
        return DEFAULT;
    }


}
