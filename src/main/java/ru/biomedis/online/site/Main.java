package ru.biomedis.online.site;

import org.anantacreative.webengine.webcore.Core;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.IOException;


/**
 * Created by Ananta on 31.07.2016.
 */
public class Main {
    public static final Logger logger = LogManager.getLogger("org.anantacreative.samplesite");

    public static void main(String[] args)
    {
        //  Core.Config cfg=new Core.Config();

        Core.Config cfg= null;
        try {
            cfg = Core.Config.fromFile();
        } catch (IOException e) {
            logger.error("Не удалось создать Config из  INI файла",e);
            throw new RuntimeException(e);
        }

        Core core=Core.buildCore(cfg);


        try
        {


        } catch (Exception e)
        {
            logger.error(e.getMessage(),e);
        }



        try {

            Thread.currentThread().sleep(Long.MAX_VALUE);
        } catch (InterruptedException e) {
            throw new RuntimeException(e.getMessage());
        }

    }
}
