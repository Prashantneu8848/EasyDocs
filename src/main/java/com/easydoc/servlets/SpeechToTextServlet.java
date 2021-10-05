package com.easydoc.servlets;

import com.google.cloud.speech.v1.RecognitionAudio;
import com.google.cloud.speech.v1.RecognitionConfig;
import com.google.cloud.speech.v1.RecognitionConfig.AudioEncoding;
import com.google.cloud.speech.v1.RecognizeResponse;
import com.google.cloud.speech.v1.SpeechClient;
import com.google.cloud.speech.v1.SpeechRecognitionAlternative;
import com.google.cloud.speech.v1.SpeechRecognitionResult;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/speechtotext")
public class SpeechToTextServlet extends HttpServlet {
  /** Demonstrates using the Speech API to transcribe an audio file. */

  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("text/html;");
    // Instantiates a client
    try (SpeechClient speechClient = SpeechClient.create()) {

      // The path to the audio file to transcribe
      String gcsUri = "gs://cloud-samples-data/speech/brooklyn_bridge.raw";

      // Builds the sync recognize request
      RecognitionConfig config = RecognitionConfig.newBuilder().setEncoding(AudioEncoding.LINEAR16)
          .setSampleRateHertz(16000).setLanguageCode("en-US").build();

      RecognitionAudio audio = RecognitionAudio.newBuilder().setUri(gcsUri).build();

      // Performs speech recognition on the audio file
      RecognizeResponse recognizeResponse = speechClient.recognize(config, audio);
      List<SpeechRecognitionResult> results = recognizeResponse.getResultsList();

      StringBuilder text = new StringBuilder();

      for (SpeechRecognitionResult result : results) {
        // There can be several alternative transcripts for a given chunk of speech.
        // Just use the first (most likely) one here.
        SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
        text.append(alternative.getTranscript());
        // System.out.printf("Transcription: %s%n", alternative.getTranscript());
      }
      response.getWriter().println(text.toString());
      // return Optional.of(text.toString());
    } catch (Exception exception) {
      System.err.println(exception);
      response.getWriter().println("Some error ocurred");
    }
  }
}
