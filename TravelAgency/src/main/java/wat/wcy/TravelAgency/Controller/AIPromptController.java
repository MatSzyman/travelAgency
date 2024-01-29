package wat.wcy.TravelAgency.Controller;

import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/prompt")
public class AIPromptController {

    private final ChatClient chatClient;

    public AIPromptController(ChatClient chatClient){
        this.chatClient = chatClient;
    }

    @GetMapping(value = "/entertainment")
    public String testAiPrompt(
            @RequestParam String cityName,
            @RequestParam String travelName
    ){
        PromptTemplate promptTemplate = new PromptTemplate("""
                Napisz w imieniu Biura Podróży Preku Travel
                co można zwiedzić na wycieczce {travelName}
                w {cityName}. Użyj maksymalnie 80 słów.""");
        promptTemplate.add("cityName", cityName);
        promptTemplate.add("travelName", travelName);

        return chatClient.call(promptTemplate.create()).getResult().getOutput().getContent();
    }
}
