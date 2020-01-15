<?php
//namespace Model;
////use Library\Shopify\ShopifyClient;
//use Library\Shopify\ShopifyClientPrivate;

require_once 'ShopifyClient.php';
require_once 'ShopifyClientPrivate.php';


class Clients
{
    const SHOP_PUBLIC  = 'public';
    const SHOP_PRIVATE = 'private';
    private $client = null;
    public function __construct($args)
    {
        if ($args['type'] == self::SHOP_PUBLIC) {
            $this->client = new ShopifyClient($args['shop_domain'], $args['token'], $args['api_key'], $args['secret']);
        } elseif ($args['type'] == self::SHOP_PRIVATE) {
            $this->client = new ShopifyClientPrivate($args['api_key'].':'.$args['api_password'].'@'. $args['shop_domain'], null, null, null);
        }
    }
    public function call($method, $path, $params = array())
    {
        return $this->client->call($method, $path, $params);
    }
}

class Shopify extends Clients
{
    public $LIMIT = 250;

    public function __construct($args = array('type'=>'public'))
    {
        parent::__construct($args);
    }
    /**
     * ------------------------------------------
     * PRODUCTS
     * ------------------------------------------
     **/

    public function getAllProducts($page = 1, $limit = 250)
    {
        return parent::call('GET', '/admin/products.json', array('page'=>$page,'limit'=>$limit,'fields'=>null));//
    }

    public function getAllCountProducts($query = array())
    {
        return parent::call('GET', '/admin/products/count.json', $query);//
    }

    public function createNewProduct($arrProduct)
    {
        return parent::call('POST', '/admin/products.json', $arrProduct);
    }
    public function deleteProduct($id)
    {
        return parent::call('DELETE ', '/admin/products/'.$id.'.json');
    }
    public function updateProduct($arrProduct)
    {
        /*
        function valores($arrProduct){
            print_r($arrProduct);
            print_r($arrProduct["product"]);

            print_r($arrProduct["product"][0]["id"]);
        }
        
        return valores($arrProduct);
        */
        return parent::call('PUT', '/admin/products/'.$arrProduct["product"]["id"].'.json', $arrProduct);
    }
    /**
     * ------------------------------------------
     * VARIANTS
     * ------------------------------------------
     **/
    public function variantCreate($product_id, $arrVariant)
    {
        return parent::call('POST', '/admin/products/'.$product_id.'/variants.json', $arrVariant);
    }
    public function variantUpdate($arrVariant)
    {
        return parent::call('PUT', '/admin/variants/'.$arrVariant['variant']['id'].'.json', $arrVariant);
    }
    public function variantDelete($product_id, $variant_id)
    {
        return parent::call('DELETE ', '/admin/products/'.$product_id.'/variants/'.$variant_id.'.json');
    }
    public function getVariantsByProductId($product_id)
    {
        return parent::call('GET', '/admin/products/'.$product_id.'/variants.json', array('fields'=>'id,sku','limit'=>100));
    }
    /**
     * ------------------------------------------
     * USER DATA
     * ------------------------------------------
     **/
    public function adminShop()
    {
        return parent::call('GET', '/admin/shop.json');//
    }
    /**
     * ------------------------------------------
     * WEBHOOKS
     * ------------------------------------------
     **/
    public function webhookGetAll()
    {
        return parent::call('GET', '/admin/webhooks.json');
    }
    public function webhookGetById($id)
    {
        return parent::call('GET', '/admin/webhooks/'.$id.'.json');
    }
    public function webhookCreate($arrWebhook)
    {
        return parent::call('POST', '/admin/webhooks.json', $arrWebhook);
    }
    public function webhookUpdate($arrWebhook)
    {
        return parent::call('PUT', '/admin/webhooks/'.$arrWebhook['webhook']['id'].'.json', $arrWebhook);
    }
    public function webhookDelete($id)
    {
        return parent::call('DELETE', '/admin/webhooks/'.$id.'.json');
    }
    /**
     * ------------------------------------------
     * COLLECTIONS
     * ------------------------------------------
     **/
    public function getAllCollections()
    {
        return parent::call('GET', '/admin/custom_collections.json');
    }
    public function getCollectionById($id)
    {
        return parent::call('GET', '/admin/custom_collections/'.$id.'.json');
    }
    public function getProductsByCollectionId($id)
    {
        return parent::call('GET', '/admin/products.json?collection_id='.$id);
    }
    public function getCollectionByProductId($id)
    {
        return parent::call('GET', '/admin/custom_collections.json?product_id='.$id);
    }
    public function productInCollection($porduct_id, $collection_id)
    {
        return parent::call('POST', '/admin/collects.json', array('collect'=>array('product_id'=>$porduct_id,'collection_id'=>$collection_id)));
    }
    public function getCollect($id)
    {
        return parent::call('GET', '/admin/collects/'.$id.'.json');
    }
    /**
     * ------------------------------------------
     * SMART COLLECTIONS
     * ------------------------------------------
     **/

    public function getAllSmartCollectionById($id)
    {
        return parent::call('GET', '/admin/smart_collections/'.$id.'.json');//
    }
    public function smartCollectionUpdate($data)
    {
        return parent::call('PUT', '/admin/smart_collections/'.$data['smart_collection']['id'].'.json', $data);//
    }
    /**
     * ------------------------------------------
     * ORDERS
     * ------------------------------------------
     **/
    public function getOrders($page = 1)
    {
        return parent::call('GET', '/admin/orders.json', array('limit'=>'250','page'=>$page));
    }
    public function getOrder($id)
    {
        return parent::call('GET', '/admin/orders/'.$id.'.json');
    }
    public function insertOrder($arrOrder)
    {
        return parent::call('POST', '/admin/orders.json', $arrOrder);
    }
    public function deleteOrder($orderId)
    {
        return parent::call('DELETE', '/admin/orders/'.$orderId.'.json');
    }

    public function cancelOrder($orderId)
    {
        return parent::call('POST', '/admin/orders/'.$orderId.'/cancel.json');
    }

    public function fulfilledtest($orderId, $arrOrder)
    {
        return parent::call('POST', '/admin/orders/'.$orderId.'/fulfillments.json', $arrOrder);
    }

    /**
     * ------------------------------------------
     * RECURRING PAYMENT
     * ------------------------------------------
     * */
    public function getRecurringApplicationCharges()
    {
        return parent::call('GET', '/admin/recurring_application_charges.json');
    }
    public function createRecurringApplicationCharges($recurring)
    {
        return parent::call('POST', '/admin/recurring_application_charges.json', $recurring);
    }
    public function activateRecurringApplicationCharges($recurringId)
    {
        return parent::call('POST', '/admin/recurring_application_charges/'.$recurringId.'/activate.json');
    }
    public function deleteRecurringApplicationCharges($recurringId)
    {
        return parent::call('DELETE', '/admin/recurring_application_charges/'.$recurringId.'.json');
    }
}
