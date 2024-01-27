package wat.wcy.TravelAgency.Controller;

import org.springframework.ai.chat.ChatClient;
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

    @GetMapping
    public String testAiPrompt(
            @RequestParam String message
    ){
        return chatClient.call(message);
    }
}
