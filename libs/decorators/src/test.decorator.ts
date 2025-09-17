export function TestDecorator(message: string = 'Test') {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log(`🔥 [${message}] Decorator applied to ${target.constructor.name}.${propertyKey}`);
    
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      console.log(`🚀 [${message}] Method ${propertyKey} called with args:`, args);
      
      const result = await originalMethod.apply(this, args);
      
      console.log(`✅ [${message}] Method ${propertyKey} completed, result:`, result);
      
      return result;
    };
    
    return descriptor;
  };
}