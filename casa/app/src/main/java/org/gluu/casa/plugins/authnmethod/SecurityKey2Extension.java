package org.gluu.casa.plugins.authnmethod;

import org.gluu.casa.credential.BasicCredential;
import org.gluu.casa.extension.AuthnMethod;
import org.gluu.casa.misc.Utils;
import org.gluu.casa.plugins.authnmethod.service.Fido2Service;
import org.pf4j.Extension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Extension
public class SecurityKey2Extension implements AuthnMethod {

    public static final String ACR = "fido2";

    private Logger logger = LoggerFactory.getLogger(getClass());

    private Fido2Service fido2Service;

    public SecurityKey2Extension() {
        fido2Service = Utils.managedBean(Fido2Service.class);
    }

    public String getUINameKey() {
        return "usr.fido2_label";
    }

    public String getAcr() {
        return ACR;
    }

    public String getPanelTitleKey() {
        return "usr.fido2_title";
    }

    public String getPanelTextKey() {
        return "usr.fido2_text";
    }

    public String getPanelButtonKey() {
        return "usr.fido2_manage";
    }

    public String getPanelBottomTextKey() {
        return "usr.fido2_buy_title";
    }

    public String getPageUrl() {
        return "/user/fido2-detail.zul";
    }

    public List<BasicCredential> getEnrolledCreds(String id) {

        try {
            return fido2Service.getDevices(id, true).stream()
                    .map(dev -> new BasicCredential(dev.getNickName(), dev.getCreationDate().getTime())).collect(Collectors.toList());
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    public int getTotalUserCreds(String id) {
        return fido2Service.getDevicesTotal(id, true);
    }

    public boolean mayBe2faActivationRequisite() {
        return Boolean.parseBoolean(fido2Service.getScriptPropertyValue("2fa_requisite"));
    }

    public void reloadConfiguration() {
        fido2Service.reloadConfiguration();
    }

}
