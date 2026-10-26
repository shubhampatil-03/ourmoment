
package com.ourmoment.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ourmoment.dto.CreateInvitationRequest;
import com.ourmoment.dto.InvitationResponseDto;
import com.ourmoment.service.InvitationService;

@RestController
@RequestMapping("/api/invitations")
@CrossOrigin(origins = "http://localhost:5173")
public class InvitationController {

    private final InvitationService invitationService;

    public InvitationController(InvitationService invitationService) {
        this.invitationService = invitationService;
    }

    @PostMapping
    public ResponseEntity<InvitationResponseDto> create(
            @Valid @RequestBody CreateInvitationRequest request,
            Principal principal) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(invitationService.create(
                        principal.getName(), request));
    }

    @GetMapping("/my")
    public List<InvitationResponseDto> getMine(Principal principal) {
        return invitationService.getMine(principal.getName());
    }

    @GetMapping("/public/{token}")
    public InvitationResponseDto getPublic(@PathVariable String token) {
        return invitationService.getPublic(token);
    }

    @PostMapping("/public/{token}/response")
    public InvitationResponseDto respond(
            @PathVariable String token,
            @RequestBody Map<String, String> body) {

        return invitationService.respond(
                token, body.get("response"));
    }
}

