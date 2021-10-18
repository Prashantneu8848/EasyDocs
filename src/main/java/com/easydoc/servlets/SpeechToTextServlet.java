package com.easydoc.servlets;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/speechtotext")
public class SpeechToTextServlet extends HttpServlet {

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("text/html;");
    String translatedText = SpeechToTextRealtime.convertToText(new String[] { "lang_code" });
    response.getWriter().println(translatedText);
  }
}
