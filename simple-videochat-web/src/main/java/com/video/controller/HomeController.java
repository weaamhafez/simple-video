package com.video.controller;


import java.util.Vector;

import javax.media.CaptureDeviceManager;
import javax.media.format.VideoFormat;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sun.media.protocol.vfw.VFWCapture;



@Controller
@RequestMapping("/home")
public class HomeController {

    @RequestMapping(value = "", method = RequestMethod.GET)
    public String entry() {
        for (int i = 0; i < 10; i++) {
            String name = VFWCapture.capGetDriverDescriptionName(i);
            if (name != null && name.length() > 1) {
                com.sun.media.protocol.vfw.VFWSourceStream.autoDetect(i);
            }
        }
    	Vector devices = CaptureDeviceManager.getDeviceList(null);
        return "home";
    }
}
