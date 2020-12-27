def validationError():
    return {
        "mes" : "Field is required"
    }

def internal_server():
    return {
        "mes": "Something Wrong"
    }

def not_found():
    return {
        "mes" : "Not found"
    }

def type_error():
    return {
        "mes" : "update() argument after ** must be a mapping, not NoneType"
    }

def success():
    return {
        "mes": "Success a action"
    }

def atribute_error():
    return {
        "mes" :"NoneType object has no attribute delete"
    }