package fr.unice.polytech.isa.resort.integration;

import fr.unice.polytech.isa.accounts.components.CardRegistryBean;
import fr.unice.polytech.isa.accounts.components.CustomerLinkerBean;
import fr.unice.polytech.isa.accounts.components.CustomerRegistryBean;
import fr.unice.polytech.isa.accounts.components.PassRegistryBean;
import fr.unice.polytech.isa.accounts.exceptions.CardNotFoundException;
import fr.unice.polytech.isa.accounts.exceptions.CustomerNotFoundException;
import fr.unice.polytech.isa.accounts.interfaces.*;
import fr.unice.polytech.isa.common.entities.accounts.Customer;
import fr.unice.polytech.isa.common.entities.shopping.catalog.ItemCatalog;
import fr.unice.polytech.isa.common.entities.shopping.catalog.ItemType;
import fr.unice.polytech.isa.common.entities.items.ItemTypeName;
import fr.unice.polytech.isa.common.entities.items.SuperCartex;
import fr.unice.polytech.isa.common.exceptions.*;
import fr.unice.polytech.isa.notifications.components.NotificationProcessorBean;
import fr.unice.polytech.isa.notifications.components.NotificationRegistryBean;
import fr.unice.polytech.isa.notifications.components.NotificationSchedulerBean;
import fr.unice.polytech.isa.notifications.interfaces.NotificationProcessing;
import fr.unice.polytech.isa.notifications.interfaces.NotificationRegistration;
import fr.unice.polytech.isa.notifications.interfaces.NotificationScheduling;
import fr.unice.polytech.isa.payment.components.BillingBean;
import fr.unice.polytech.isa.payment.interfaces.PaymentProcessor;
import fr.unice.polytech.isa.resort.components.*;
import fr.unice.polytech.isa.resort.exceptions.ResortNotFoundException;
import fr.unice.polytech.isa.resort.exceptions.SkiLiftNotFoundException;
import fr.unice.polytech.isa.resort.exceptions.SkiTrailNotFoundException;
import fr.unice.polytech.isa.resort.exceptions.UnavailableNameException;
import fr.unice.polytech.isa.resort.interfaces.*;
import fr.unice.polytech.isa.shopping.components.CartManagerBean;
import fr.unice.polytech.isa.shopping.components.CatalogBean;
import fr.unice.polytech.isa.shopping.components.DiscountBean;
import fr.unice.polytech.isa.shopping.interfaces.*;
import fr.unice.polytech.isa.statistics.components.presence.PresenceStatisticsFindingBean;
import fr.unice.polytech.isa.statistics.components.presence.PresenceStatisticsRegistryBean;
import fr.unice.polytech.isa.statistics.components.presence.PresenceStatisticsUpdateBean;
import fr.unice.polytech.isa.statistics.interceptors.CardCounter;
import fr.unice.polytech.isa.statistics.interfaces.presence.PresenceStatisticsFinder;
import fr.unice.polytech.isa.statistics.interfaces.presence.PresenceStatisticsRegistration;
import fr.unice.polytech.isa.statistics.interfaces.presence.PresenceStatisticsUpdater;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.transaction.api.annotation.TransactionMode;
import org.jboss.arquillian.transaction.api.annotation.Transactional;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.ClassLoaderAsset;
import org.jboss.shrinkwrap.api.spec.JavaArchive;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.UserTransaction;
import java.time.LocalDateTime;

import static fr.unice.polytech.isa.resort.ResortTestUtil.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(Arquillian.class)
@Transactional(TransactionMode.COMMIT)
public class SuperCartexIntegrationTest {
    @EJB
    private CreditCardRegistration creditCardRegistration;

    @EJB
    private CatalogModifier catalogModifier;

    @EJB
    private CatalogExplorer catalogExplorer;

    @EJB
    private SuperCartexProcessor superCartexProcessor;

    @EJB
    private CardRegistration cardRegistration;

    @EJB
    private CardFinder cardFinder;

    @EJB
    private CardChecker cardChecker;

    @EJB
    private ResortRegister resortRegister;

    @EJB
    private ResortFinder resortFinder;

    @EJB
    private SkiLiftRegister skiLiftRegister;

    @EJB
    private SkiLiftFinder skiLiftFinder;

    @PersistenceContext private EntityManager entityManager;
    @Inject
    private UserTransaction utx;
    private Customer marcel_account;
    private String resortId;

    @Deployment
    public static JavaArchive createDeployment() {
        return ShrinkWrap.create(JavaArchive.class)
            //Add this server's classes
            .addClass(AccessControllerBean.class)
            .addClass(AccessRegisterBean.class)
            .addClass(ResortRegistryBean.class)
            .addClass(SkiLiftRegistryBean.class)
            .addClass(SkiTrailRegistryBean.class)
            .addClass(ResortNotFoundException.class)
            .addClass(SkiLiftNotFoundException.class)
            .addClass(SkiTrailNotFoundException.class)
            .addClass(UnavailableNameException.class)
            .addClass(AccessRegister.class)
            .addClass(CardChecker.class)
            .addClass(ResortFinder.class)
            .addClass(ResortRegister.class)
            .addClass(SkiLiftFinder.class)
            .addClass(SkiLiftRegister.class)
            .addClass(SkiTrailFinder.class)
            .addClass(SkiTrailRegister.class)
            //Account server's classes
            .addClass(CustomerRegistration.class)
            .addClass(CustomerRegistryBean.class)
            .addClass(CardRegistration.class)
            .addClass(CardFinder.class)
            .addClass(CardRegistryBean.class)
            .addClass(PassRegistration.class)
            .addClass(CustomerPassFinder.class)
            .addClass(PassRegistryBean.class)
            .addClass(CustomerCardLinker.class)
            .addClass(CustomerLinkerBean.class)
            //Shopping server's classes
            .addClass(CatalogModifier.class)
            .addClass(CatalogBean.class)
            .addClass(SuperCartexProcessor.class)
            .addClass(CartManagerBean.class)
            .addClass(SuperCartexDiscount.class)
            .addClass(DiscountBean.class)
            //Payment server's classes
            .addClass(PaymentProcessor.class)
            .addClass(BillingBean.class)
            //Statistics server's classes
            .addClass(CardCounter.class)
            .addClass(PresenceStatisticsUpdater.class)
            .addClass(PresenceStatisticsUpdateBean.class)
            .addClass(PresenceStatisticsFinder.class)
            .addClass(PresenceStatisticsFindingBean.class)
            .addClass(PresenceStatisticsRegistration.class)
            .addClass(PresenceStatisticsRegistryBean.class)
            //Add the notification server's classes
            .addClass(NotificationRegistration.class)
            .addClass(NotificationRegistryBean.class)
            .addClass(NotificationScheduling.class)
            .addClass(NotificationSchedulerBean.class)
            .addClass(NotificationProcessing.class)
            .addClass(NotificationProcessorBean.class)
            //Persistence manifest
            .addAsManifestResource(new ClassLoaderAsset("META-INF/persistence.xml"), "persistence.xml");
    }

    @Before
    public void setUpContext() throws ItemAlreadyExistException, UnavailableNameException, ResortNotFoundException {
        marcel_account = new Customer(MARCEL_FIRSTNAME, MARCEL_LASTNAME, MARCEL_EMAIL);
        resortRegister.registerResort(RESORT_NAME, RESORT_EMAIL, OPEN, RESORT_CITY_NAME);
        resortId = resortFinder.findByName(RESORT_NAME).getId();
        skiLiftRegister.registerSkiLift(resortId, SKI_LIFT_NAME, OPEN);
        entityManager.persist(marcel_account);
        initCatalog();
    }

    public void initCatalog() throws ItemAlreadyExistException {
        catalogModifier.addCard(SUPER_CARTEX, SUPERCARTEX_CARD, PRICE_10, PUBLIC_ITEM);
        catalogModifier.addPass(SUPER_ORIGINAL_PASS, PRICE_10, PRICE_10, DAYS_1, PRIVATE_ITEM);
        catalogModifier.addPass(SUPER_FREE_HOUR_PASS, PRICE_0, PRICE_0, HOURS_1, PRIVATE_ITEM);
        catalogModifier.addPass(SUPER_FREE_EIGHTH, PRICE_0, PRICE_0, DAYS_1, PRIVATE_ITEM);
    }


    @Test
    public void checkSuperCartex() throws CustomerNotFoundException, PaymentException, PassNotFoundException, NoCreditCardException, CardNotFoundException, EmptyCartException, UnknownCatalogEntryException, NullQuantityException, ResortNotFoundException, SkiLiftNotFoundException {
        cardRegistration.addCard(MARCEL_EMAIL, new ItemType(SUPER_CARTEX, PRICE_10, ItemTypeName.SUPERCARTEX));
        SuperCartex superCartex = (SuperCartex) cardFinder.findSuperCartexCards().get(0);
        assertTrue(cardChecker.checkCard(skiLiftFinder.findByName(resortId, SKI_LIFT_NAME), superCartex)); //first hour
        assertEquals(SUPER_FREE_HOUR_PASS, superCartex.getPass().getType().getName());
        creditCardRegistration.creditCardRegistry(marcel_account, MARCEL_LASTNAME, CREDIT_CARD_NO, CVV, EXPIRY_DATE, SAVE);
        assertTrue(superCartexProcessor.processSuperCartex(superCartex)); //pay original pass
        assertEquals(SUPER_ORIGINAL_PASS, superCartex.getPass().getType().getName());
        superCartex.setFirstSwipe(LocalDateTime.now().minusDays(7));
        assertTrue(superCartexProcessor.processSuperCartex(superCartex)); //free eighth day pass
        assertEquals(SUPER_FREE_EIGHTH, superCartex.getPass().getType().getName());

    }

    @After
    public void cleaningUp() throws Exception {
        utx.begin();
        marcel_account = entityManager.merge(marcel_account);
        entityManager.remove(marcel_account);
        for (ItemCatalog c : catalogExplorer.displayCatalog()){
            ItemCatalog item  = entityManager.merge(c);
            entityManager.remove(item);
        }
        for (ItemCatalog c : catalogExplorer.displayPrivateCatalog()){
            ItemCatalog item  = entityManager.merge(c);
            entityManager.remove(item);
        }
        entityManager.remove(resortFinder.findById(resortId));
        marcel_account = null;
        utx.commit();
    }
}
